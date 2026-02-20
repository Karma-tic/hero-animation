export default function Stats() {
  return (
    <div className="mt-12 grid grid-cols-2 gap-6">
      <div className="bg-lime-400 p-8 rounded-xl">
        <h2 className="text-4xl font-bold">58%</h2>
        <p>Increase in pickup usage</p>
      </div>

      <div className="bg-sky-400 p-8 rounded-xl">
        <h2 className="text-4xl font-bold">23%</h2>
        <p>Decrease in support calls</p>
      </div>
    </div>
  );
}