const Range = ({ value, setValue, min = 0, max = 10, step = 1 }) => {

  return (
    <div>
      <label
        htmlFor="customRange1"
        className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
      >
      </label>
      <input
        type="range"
        className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
        id="customRange1"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => setValue(e.target.value)}
      />

    </div>
  );
};

export default Range;