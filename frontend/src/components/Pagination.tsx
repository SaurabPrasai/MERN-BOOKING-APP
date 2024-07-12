export type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: Props) => {
  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  return <div className="flex flex-row justify-center">
    <ul className="flex border border-slate-300">
      {
        pageNumbers.map((number) => (
          <li key={number} className={` ${number === page ? "bg-gray-200" : ""}  px-4 py-2 border-r border-slate-300`}>
            <button onClick={() => onPageChange(number)}>{number}</button>
          </li>
        ))
      }
    </ul>
  </div>;
};

export default Pagination;
