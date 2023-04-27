import axios from "axios";
import { useEffect, useState } from "react";
// import config from "./config";
import ReactPaginate from "react-paginate";


function App() {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImages, setCurrentImages] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [imagesOffset, setImagesOffset] = useState(0);
  useEffect(() => {
   setIsLoading(true);
    axios
      .get(
        `https://api.unsplash.com/photos/?client_id=lECsKcnV2RAO0IwpLfPZQFn22fSNqr1SPlSs-bzJcuw&per_page=30`
      )
      .then((res) => {
        setImages((prevState) => [...res.data]);
        setIsLoading(false);
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const endOffset = imagesOffset + 8;
    setCurrentImages(images.slice(imagesOffset, endOffset));
    setPageCount(Math.ceil(images.length / 8));
  }, [images, imagesOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 8) % images.length;
    setImagesOffset(newOffset);
  };

  
  return (
    <>
          <h2>My Image Gallery</h2>
          <div className="App">
            {currentImages?.map((image, i) => {
              return (
                <div className="img-wrapper" key={i}>
                  <img src={image?.urls?.thumb} alt={image.alt_description} />
                </div>
              );
            })}
          </div>
          
          <div className="pagination">
  <ReactPaginate
    breakLabel="..."
    nextLabel="next >"
    onPageChange={handlePageClick}
    pageRangeDisplayed={5}
    pageCount={pageCount}
    previousLabel="< previous"
    renderOnZeroPageCount={null}
    breakClassName={"page-item"}
    breakLinkClassName={"page-link"}
    containerClassName={"pagination"}
    pageClassName={"page-item"}
    pageLinkClassName={"page-link"}
    previousClassName={"page-item"}
    previousLinkClassName={"page-link"}
    nextClassName={"page-item"}
    nextLinkClassName={"page-link"}
    activeClassName={"active"}
  />
</div>
    </>
  )
}
export default App;