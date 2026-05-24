"use client";

export default function ReserveButton({
  inventoryId,
}: {
  inventoryId: string;
}) {

  async function reserveProduct() {

    const response = await fetch(
      "/api/reservations",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          inventoryId,
          quantity: 1,
        }),
      }
    );

    const data = await response.json();

    alert(
      data.error ||
      "Reservation successful"
    );

    window.location.reload();
  }

  return (
    <button
      onClick={reserveProduct}
      className="
        mt-4
        bg-black
        text-white
        px-4
        py-2
        rounded
      "
    >
      Reserve 1 Item
    </button>
  );
}