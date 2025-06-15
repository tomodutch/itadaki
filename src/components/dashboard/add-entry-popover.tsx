"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { BarcodeScanDialog } from "./barcode-scan-dialog";
import { PlusIcon, ScanBarcodeIcon } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { FoodTemplate } from "@/db/generated/prisma";

interface AddEntryPopoverProps {
  foodTemplates: FoodTemplate[],
  onAdd: (entry: FoodTemplate) => void;
}

export function AddEntryPopover({ foodTemplates, onAdd }: AddEntryPopoverProps) {
  const [open, setOpen] = useState(false);
  const [barcodeOpen, setBarcodeOpen] = useState(false);
  const [query, setQuery] = useState("");
  const isDesktop = useMediaQuery("(min-width: 768px)")
  function handleSelect(entry: FoodTemplate) {
    onAdd(entry);
    setOpen(false);
  }

  // Prevent SSR hydration mismatch:
  // `useMediaQuery` returns false on the server (no window.matchMedia),
  // so we wait until the component has mounted on the client before rendering.
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const content = (
    <Command>
      <div className="flex items-center justify-between p-2 gap-2 px-2 py-1">
        <CommandInput
          placeholder="Search food..."
          className="flex-1"
          value={query}
          onValueChange={setQuery}
        />
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 p-0 shrink-0"
          onClick={() => setBarcodeOpen(true)}
        >
          <ScanBarcodeIcon className="w-4 h-4" />
        </Button>
      </div>
      <CommandList className="max-h-64 overflow-auto">
        {(["local"] as const).map((source) => {
          const labelMap = {
            local: "🍽️ My Foods",
            usda: "🇺🇸 USDA",
            openfoodfacts: "🌍 OpenFoodFacts",
          };
          const items = foodTemplates.filter((f) =>
            f.name.toLowerCase().includes(query.toLowerCase())
          );
          if (!items.length) return null;
          return (
            <CommandGroup heading={labelMap[source]} key={source}>
              {items.map((entry) => (
                <CommandItem key={entry.id} onSelect={() => handleSelect(entry)}>
                  <div className="flex flex-col">
                    <span className="font-medium">{entry.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {entry.calories} kcal / 100g
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          );
        })}
      </CommandList>
    </Command>
  );


  return (
    <>
      {isDesktop ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-auto" onClick={() => setOpen(true)}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">{content}</PopoverContent>
        </Popover>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-auto" onClick={() => setOpen(true)}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add
            </Button>
          </DrawerTrigger>
          <DrawerContent className="pt-4">
            <DrawerTitle>Search food</DrawerTitle>
            <div className="border-t px-4 pb-4">{content}</div>
          </DrawerContent>
        </Drawer>
      )}

      {
        barcodeOpen && (
          <BarcodeScanDialog open={barcodeOpen} setOpen={setBarcodeOpen} onResult={() => {
            // onAdd(entry); // Assume 100g from scanned result
            setBarcodeOpen(false);
            setOpen(false);
          }} />
        )
      }
    </>
  );
}

