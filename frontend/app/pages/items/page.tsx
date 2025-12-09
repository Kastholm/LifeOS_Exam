import {client} from '@/app/global/sanity/client'
import { Info, MapPin, Tag, Star, Package } from 'lucide-react'
import { ItemModel } from './models/sanity_item'
import { ITEMS_QUERY } from './api/FetchSanityItems'

export const revalidate = 3600; // 1 hour

export default async function AllItems() {
    const items: ItemModel[] = await client.fetch(ITEMS_QUERY)

    const structuredItems = items.reduce((currentCategoryList, item) => {

        let location = item.location?.name || 'Ukendt'
        let category = item.category?.name || 'Ukendt'
        if(!currentCategoryList[location]){
            currentCategoryList[location] = {}
        }

        if(!currentCategoryList[location][category]){
            currentCategoryList[location][category] = []
        }
        
        currentCategoryList[location][category].push(item)

        return currentCategoryList
    }, {} as Record<string, Record<string, ItemModel[]>>)

    console.log(typeof(structuredItems), 'dsa') 

    
    return (
        <div className="container mx-auto px-4 py-8 ">
            <h1 className="text-3xl font-bold mb-8">Mine Ejendele</h1>
            
            <div className="space-y-10">
                {Object.entries(structuredItems).map(([location, categories]) => (
                    <div key={location}>
                        {/* Location Header */}
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                            <MapPin className="h-5 w-5 text-primary" />
                            <h2 className="text-xl font-bold">{location}</h2>
                        </div>
                        
                        <div className="space-y-6 pl-4 border-l-2 border-border/30 ml-2">
                            {Object.entries(categories).map(([categoryName, categoryItems]) => (
                                <div key={categoryName}>
                                    {/* Category Header */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <Tag className="h-4 w-4 text-blue-500" />
                                        <h3 className="text-sm font-semibold text-muted-foreground">{categoryName}</h3>
                                        <span className="text-xs text-muted-foreground/50">({categoryItems.length})</span>
                                    </div>
                                    
                                    {/* Items Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pl-2">
                                        {categoryItems.map((item: ItemModel) => (
                                            <div 
                                                key={item._id}
                                                className="flex flex-col p-2 rounded-md bg-card border border-border/40 hover:border-primary/40 transition-colors"
                                            >
                                                {/* Top: Rating, Til salg, Antal */}
                                                <div className="flex items-center gap-2 text-[10px] mb-1">
                                                    {item.value && (
                                                        <span className="inline-flex items-center gap-0.5 text-amber-500">
                                                            <Star className="h-2.5 w-2.5 fill-current" />
                                                            {item.value}
                                                        </span>
                                                    )}
                                                    {item.forSale && (
                                                        <span className="text-green-500 font-medium">Salg</span>
                                                    )}
                                                    <span className="text-muted-foreground ml-auto">x{item.quantity}</span>
                                                </div>
                                                
                                                {/* Title */}
                                                <h4 className="text-xs font-semibold text-foreground leading-tight line-clamp-2">
                                                    {item.name}
                                                </h4>
                                                
                                                {/* Description */}
                                                {item.description && (
                                                    <p className="text-[10px] text-muted-foreground line-clamp-2 mt-1">
                                                        {item.description}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}