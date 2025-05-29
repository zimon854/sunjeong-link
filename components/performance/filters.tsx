'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

type FilterState = {
  startDate: Date | null;
  endDate: Date | null;
  device: string | null;
};

type FiltersProps = {
  onFilterChange: (filters: FilterState) => void;
};

export function Filters({ onFilterChange }: FiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    startDate: null,
    endDate: null,
    device: null,
  });

  const handleDateChange = (date: Date | null, type: 'start' | 'end') => {
    const newFilters = {
      ...filters,
      [type === 'start' ? 'startDate' : 'endDate']: date,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDeviceChange = (value: string) => {
    const newFilters = {
      ...filters,
      device: value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-wrap gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[240px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {filters.startDate ? (
              format(filters.startDate, 'PPP', { locale: ko })
            ) : (
              <span>시작일 선택</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={filters.startDate}
            onSelect={(date: Date | null) => handleDateChange(date, 'start')}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[240px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {filters.endDate ? (
              format(filters.endDate, 'PPP', { locale: ko })
            ) : (
              <span>종료일 선택</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={filters.endDate}
            onSelect={(date: Date | null) => handleDateChange(date, 'end')}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Select onValueChange={handleDeviceChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="기기 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체</SelectItem>
          <SelectItem value="desktop">데스크톱</SelectItem>
          <SelectItem value="mobile">모바일</SelectItem>
          <SelectItem value="tablet">태블릿</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
} 