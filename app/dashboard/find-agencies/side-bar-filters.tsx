import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, X, ChevronDown } from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function SideBarFilters() {
    return (
        <div className="w-72 sticky top-28 self-start">
            <Card className="max-h-full overflow-y-auto">
                <CardHeader>
                    <CardTitle className="">Filters</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <div className="relative">
                                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                                <input
                                    type="search"
                                    placeholder="Search..."
                                    className="w-full pl-7 px-2 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>{" "}
                        </div>
                        <div>
                            <p className="font-semibold mb-2 text-muted-foreground">
                                Applied Filters
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2.5 py-0.5 rounded-full text-sm bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700/30 flex items-center gap-1">
                                    SEO
                                    <button className="hover:text-indigo-900">
                                        <X className="h-3 w-3" />
                                    </button>
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full text-sm bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700/30 flex items-center gap-1">
                                    Digital Marketing
                                    <button className="hover:text-indigo-900">
                                        <X className="h-3 w-3" />
                                    </button>
                                </span>
                            </div>
                        </div>
                        <Collapsible>
                            <CollapsibleTrigger className="flex w-full items-center justify-between">
                                <p className="font-semibold text-muted-foreground">Services</p>
                                <ChevronDown className="h-4 w-4" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-2 pt-2">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300"
                                    />
                                    <span className="text-sm">SEO</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300"
                                    />
                                    <span className="text-sm">
                                        Content Marketing
                                    </span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300"
                                    />
                                    <span className="text-sm">
                                        Social Media
                                    </span>
                                </label>
                            </CollapsibleContent>
                        </Collapsible>
                        <Collapsible>
                            <CollapsibleTrigger className="flex w-full items-center justify-between">
                                <p className="font-semibold text-muted-foreground">Location</p>
                                <ChevronDown className="h-4 w-4" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-2 pt-2">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300"
                                    />
                                    <span className="text-sm">
                                        North America
                                    </span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300"
                                    />
                                    <span className="text-sm">Europe</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300"
                                    />
                                    <span className="text-sm">
                                        Asia Pacific
                                    </span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300"
                                    />
                                    <span className="text-sm">
                                        Latin America
                                    </span>
                                </label>
                            </CollapsibleContent>
                        </Collapsible>
                        <Collapsible>
                            <CollapsibleTrigger className="flex w-full items-center justify-between">
                                <p className="font-semibold text-muted-foreground">Budget Range</p>
                                <ChevronDown className="h-4 w-4" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-2 pt-2">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300"
                                    />
                                    <span className="text-sm">
                                        $1,000 - $5,000
                                    </span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300"
                                    />
                                    <span className="text-sm">
                                        $5,000 - $10,000
                                    </span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300"
                                    />
                                    <span className="text-sm">$10,000+</span>
                                </label>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}