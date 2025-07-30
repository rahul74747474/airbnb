import ListingCard from "./ListingCard";

export default function ListingSection({ title, listings }) {
  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold mb-4">{title} ›</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {listings.map(l => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </div>
  );
}
