"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";

function FoodItemQuantity() {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={decreaseQuantity}
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-12 text-center text-lg font-semibold">
          {quantity}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={increaseQuantity}
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button className="bg-[#CA9C5E] hover:bg-[#bd9158]">
        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
      </Button>
    </div>
  );
}

export default FoodItemQuantity;
