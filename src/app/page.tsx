"use client";
import { ShoppingItem } from "@/generated/prisma";
import { FormEvent, useEffect, useState } from "react";

export default function Home() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const fetchItems = async () => {
    const res = await fetch("/api/items");
    const data: ShoppingItem[] = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddItem = async (e: FormEvent) => {
    console.log("add item handle");
    e.preventDefault();
    if (!name) return;

    await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, quantity: quantity }),
    });

    setName("");
    setQuantity("");
    fetchItems();
  };

  const handleTogglePurchased = async (item: ShoppingItem) => {
    await fetch(`/api/items/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, purchased: !item.purchased }),
    });
    fetchItems();
  };

  const handleDeleteItem = async (id: string) => {
    await fetch(`/api/items/${id}`, {
      method: "DELETE",
    });
    fetchItems();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto max-w-2xl p-4">
        <h1 className="text-4xl text-black font-bold text-center mb-8">
          Ortak Ev Alışveriş Listesi
        </h1>

        <form
          onSubmit={handleAddItem}
          className="bg-white p-6 rounded-lg shadow-md mb-8 flex flex-col sm:flex-row gap-4"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ürün adı (örn: Süt)"
            required
            className="flex-grow p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Ürün miktarı (örn: 2 Litre)"
            className="flex-grow p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Ekle
          </button>
        </form>

        <div className="space-y-4 ">
          <h2 className="text-2xl font-semibold text-gray-900">Alınacaklar</h2>
          {items
            .filter((item) => !item.purchased)
            .map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={item.purchased}
                    onChange={() => handleTogglePurchased(item)}
                    className="h-6 w-6 rounded border-gray-300 text-green-500 focus:ring-green-500 cursor-pointer"
                  />
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-800">
                      {item.name}
                    </p>
                    {item.quantity && (
                      <p className="text-sm text-gray-500">{item.quantity}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Sil
                </button>
              </div>
            ))}
          {items.filter((item) => !item.purchased).length === 0 && (
            <p className="text-gray-600">Alınacak bir şey kalmadı! 🎉</p>
          )}
        </div>

        <div className="space-y-4 mt-12">
          <h2 className="text-2xl font-semibold text-gray-900">Alınanlar</h2>
          {items
            .filter((item) => item.purchased)
            .map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-inner flex items-center justify-between opacity-60"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={item.purchased}
                    onChange={() => handleTogglePurchased(item)}
                    className="h-6 w-6 rounded border-gray-300 text-green-500 focus:ring-green-500 cursor-pointer"
                  />
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-800">
                      {item.name}
                    </p>
                    {item.quantity && (
                      <p className="text-sm text-gray-500">{item.quantity}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Sil
                </button>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
