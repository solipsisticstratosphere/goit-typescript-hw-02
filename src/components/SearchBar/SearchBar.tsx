import { FormEvent } from "react";
interface SearchBarProps {
  onSearch: (image: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const input = form.elements.namedItem("image") as HTMLFormElement;
    const image = input.value;
    if (image.trim() === "") {
      alert("Please enter search term!");
      return;
    }
    onSearch(image);
    form.reset();
  };
  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          name="image"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};
export default SearchBar;
