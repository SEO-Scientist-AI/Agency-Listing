import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";

interface SortOptionsProps {
    onSortChange: (value: string) => void;
    currentSort: string;
}

export function SortOptions({ onSortChange, currentSort }: SortOptionsProps) {
    return (
        <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <Select value={currentSort} onValueChange={onSortChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="rating_desc">Rating: High to Low</SelectItem>
                    <SelectItem value="rating_asc">Rating: Low to High</SelectItem>
                    <SelectItem value="reviews_desc">Most Reviews</SelectItem>
                    <SelectItem value="reviews_asc">Least Reviews</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
} 