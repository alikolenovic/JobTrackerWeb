import React, { Dispatch, SetStateAction } from 'react';
import Fuse, { IFuseOptions } from 'fuse.js';
interface SearchProps<T> {
  initialData: T[];
  options: IFuseOptions<T>;
  setResultsChange: Dispatch<SetStateAction<T[] | null>>;
}

const Search = <T,>({
  initialData,
  options,
  setResultsChange,
}: SearchProps<T>): React.ReactNode => {
  const fuse = new Fuse<T>(initialData, options);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value.length == 0) {
      setResultsChange(initialData);
      return;
    }

    const results = fuse.search(value);
    const items = results.map((result) => result.item);
    setResultsChange(items);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={handleSearch}
      className="block min-w-0 bg-transparent py-1.5 pl-1 pr-3 text-base text-white placeholder:text-gray-500 focus:outline focus:outline-0 sm:text-sm/6"
    />
  );
};

export default Search;
