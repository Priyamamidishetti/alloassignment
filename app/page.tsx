import ReserveButton from "./components/ReserveButton";

async function getProducts() {
  const res = await fetch(
    "http://localhost:3000/api/products",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function Home() {

  const products = await getProducts();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Inventory System
      </h1>

      <div className="grid gap-4">

        {products.map((item: any) => (

          <div
            key={item.id}
            className="border p-4 rounded-lg"
          >
            <h2 className="text-xl font-semibold">
              {item.product}
            </h2>

            <p>
              Warehouse:
              {" "}
              {item.warehouse}
            </p>

            <p>
              Total Stock:
              {" "}
              {item.totalStock}
            </p>

            <p>
              Reserved Stock:
              {" "}
              {item.reservedStock}
            </p>

            <p>
              Available Stock:
              {" "}
              {item.availableStock}
            </p>
             <ReserveButton
  inventoryId={item.id}
/>
          </div>
        ))}

      </div>
    </div>
  );
}