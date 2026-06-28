import { ShoppingCart } from "lucide-react";

export default function ProductCard() {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc"
          alt="produk"
          className="h-60 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          Sofa Minimalis
        </h2>

        <p className="text-primary text-xl font-bold">
          Rp 2.500.000
        </p>

        <div className="card-actions justify-end">
          <button className="btn btn-outline">
            Detail
          </button>

          <button className="btn btn-primary">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}