/* eslint-disable react/prop-types */
const Filter = ({filterName, handleFilter}) => {
    return(
        <>Filter shown with a: <input onChange={handleFilter} value={filterName}/></>
    )
  
}

export default Filter;
