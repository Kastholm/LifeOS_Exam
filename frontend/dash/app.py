import os
import requests
import pandas as pd
import dash
from dash import dcc, html
from dash.dependencies import Input, Output
import plotly.express as px
from dotenv import load_dotenv

# Load environment variables from the parent directory (.env in frontend/)
# We try multiple locations just in case
load_dotenv(os.path.join(os.path.dirname(__file__), '../.env.local'))
if not os.getenv("TRAKT_CLIENT_ID"):
    load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))

# --- Data Fetching Functions ---

def fetch_movies_data():
    trakt_client_id = os.getenv("TRAKT_CLIENT_ID")
    trakt_username = os.getenv("TRAKT_USERNAME")
    
    if not trakt_client_id or not trakt_username:
        # Fallback for testing if env vars are missing
        print("Warning: Trakt credentials not found. Returning empty data.")
        return pd.DataFrame()

    headers = {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": trakt_client_id
    }
    
    try:
        # Fetch history (watched movies)
        url = f"https://api.trakt.tv/users/{trakt_username}/history/movies?limit=100"
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        
        # Process data: Count movies per month
        df = pd.DataFrame(data)
        if df.empty:
            return pd.DataFrame(columns=['month_year', 'count'])
            
        # Deduplicate movies by title (keep first occurrence)
        if 'movie' in df.columns:
            df['movie_title'] = df['movie'].apply(lambda x: x.get('title') if isinstance(x, dict) else None)
            df.drop_duplicates(subset=['movie_title'], keep='first', inplace=True)

        df['watched_at'] = pd.to_datetime(df['watched_at'])
        # Resample by month start to include months with 0 movies
        counts = df.set_index('watched_at').resample('MS').size().reset_index(name='count')
        
        #month names mapping
        months = {
            1: 'Januar', 2: 'Februar', 3: 'Marts', 4: 'April',
            5: 'Maj', 6: 'Juni', 7: 'Juli', 8: 'August',
            9: 'September', 10: 'Oktober', 11: 'November', 12: 'December'
        }
        
        # Format month_year as "YYYY-MonthName"
        counts['month_year'] = counts['watched_at'].apply(
            lambda x: f"{x.year}-{months[x.month]}"
        )
        
        return counts
    except Exception as e:
        print(f"Error fetching movies: {e}")
        return pd.DataFrame()

def fetch_books_data():
    project_id = os.getenv("NEXT_PUBLIC_SANITY_PROJECT_ID")
    dataset = os.getenv("NEXT_PUBLIC_SANITY_DATASET") or "production"
    
    if not project_id:
        print("Warning: Sanity credentials not found. Returning empty data.")
        return pd.DataFrame()

    # Query to fetch books and their completed status
    query = '*[_type == "book"] { title, completed }'
    url = f"https://{project_id}.api.sanity.io/v2021-10-21/data/query/{dataset}?query={query}"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json().get('result', [])
        
        df = pd.DataFrame(data)
        if df.empty:
             return pd.DataFrame(columns=['status', 'count'])

        # 'completed' logic: In frontend it checks: book.completed === "true"
        # Sanity might return it as a string "true"/"false" or boolean depending on schema.
        # We handle both string "true" and boolean True.
        def get_status(val):
            if str(val).lower() == 'true':
                return 'Læst'
            return 'Ulæst'

        df['status'] = df['completed'].apply(get_status)
        
        counts = df['status'].value_counts().reset_index()
        counts.columns = ['status', 'count']
        return counts
    except Exception as e:
        print(f"Error fetching books: {e}")
        return pd.DataFrame()


# --- Dash App Setup ---

app = dash.Dash(__name__, suppress_callback_exceptions=True)
server = app.server

app.layout = html.Div([
    dcc.Location(id='url', refresh=False),
    
    html.Div([
        html.H1("LifeOS Analytics", style={'textAlign': 'center', 'marginBottom': '30px', 'color': '#333'}),
        
        # Navigation
        html.Nav([
            dcc.Link('Film Statistik', href='/', style={
                'marginRight': '20px', 
                'fontSize': '18px', 
                'textDecoration': 'none',
                'color': '#0070f3',
                'padding': '10px',
                'border': '1px solid #eaeaea',
                'borderRadius': '5px'
            }),
            dcc.Link('Bog Statistik', href='/books', style={
                'fontSize': '18px', 
                'textDecoration': 'none',
                'color': '#0070f3',
                'padding': '10px',
                'border': '1px solid #eaeaea',
                'borderRadius': '5px'
            }),
        ], style={'textAlign': 'center', 'marginBottom': '50px'}),
        
        # Content Area
        html.Div(id='page-content', style={'padding': '20px', 'backgroundColor': '#fff', 'borderRadius': '10px', 'boxShadow': '0 4px 6px rgba(0,0,0,0.1)'})
    ], style={'maxWidth': '1000px', 'margin': '0 auto', 'fontFamily': '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif', 'padding': '20px'})
])

# --- Callbacks ---

@app.callback(Output('page-content', 'children'),
              [Input('url', 'pathname')])
def display_page(pathname):
    if pathname == '/books':
        # Side 2: Bøger Pie Chart
        df = fetch_books_data()
        
        if df.empty:
            return html.Div([
                html.H3("Ingen data tilgængelig for bøger"),
                html.P("Kunne ikke hente data fra Sanity eller der er ingen bøger.")
            ], style={'textAlign': 'center', 'color': '#666'})
            
        fig = px.pie(df, values='count', names='status', title='Læste vs. Ulæste Bøger',
                     color='status', 
                     color_discrete_map={'Læst': '#22c55e', 'Ulæst': '#ef4444'},
                     hole=0.4) # Donut chart style looks nicer
        
        fig.update_layout(title_x=0.5, font=dict(family="sans-serif", size=14))
        
        return html.Div([
            dcc.Graph(figure=fig)
        ])
    else:
        # Side 1 (Default): Film Bar Chart
        df = fetch_movies_data()
        
        if df.empty:
             return html.Div([
                html.H3("Ingen data tilgængelig for film"),
                html.P("Kunne ikke hente data fra Trakt eller historikken er tom.")
            ], style={'textAlign': 'center', 'color': '#666'})
            
        fig = px.bar(df, x='month_year', y='count', title='Film Set pr. Måned',
                     labels={'month_year': 'Måned', 'count': 'Antal Film'},
                     color='count', color_continuous_scale='Viridis') # Add some color
        
        fig.update_layout(title_x=0.5, font=dict(family="sans-serif", size=14), plot_bgcolor='#fafafa')
        fig.update_xaxes(tickangle=-45)
        
        return html.Div([
            dcc.Graph(figure=fig)
        ])

if __name__ == '__main__':
    app.run(debug=True, port=8050, host='127.0.0.1')

