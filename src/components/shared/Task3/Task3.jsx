/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import './Task3.css';

export const Task3 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState('');
  const [universities, setUniversities] = useState([]);
  const [error, setError] = useState('');
  const [selectedCount, setSelectedCount] = useState(0);

  useEffect(() => {
    const savedCountry = localStorage.getItem('country');
    if (savedCountry) {
      handleSearch(savedCountry);
    }
  }, []);

  const handleInputChange = (e) => {
    setCountry(e.target.value);
  };

  const handleSearchFromField = () => {
    handleSearch(country);
  };

  const handleSearch = async (searchCountry) => {
    setIsLoading(true);
    handleReset();
  
    try {
      setError('');
      const response = await fetch(`http://universities.hipolabs.com/search?country=${searchCountry}`);
      if (!response.ok) {
        throw new Error('Request error.');
      }
  
      const data = await response.json();
  
      if (data.length === 0) {
        throw new Error('Country`s name is not correct');
      }
  
      const savedSelectedIndices = JSON.parse(localStorage.getItem(`selectedIndices${searchCountry}`) || '[]');
  
      const universitiesWithSelected = data.map((university, index) => ({
        ...university,
        isSelected: savedSelectedIndices.includes(index),
      }));
  
      setUniversities(universitiesWithSelected);
  
      const selectedCount = universitiesWithSelected.filter((university) => university.isSelected).length;
      setSelectedCount(selectedCount);
  
      setIsLoading(false);
      localStorage.setItem('country', searchCountry);
    } catch (error) {
      setError(error.message);
      setUniversities([]);
      setSelectedCount(0);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCountry('');
    setUniversities([]);
    setError('');
    setSelectedCount(0);
    localStorage.removeItem('country');
  };

  const handleCheckboxChange = (index) => {
    const updatedUniversities = [...universities];
    updatedUniversities[index].isSelected = !updatedUniversities[index].isSelected;
    setUniversities(updatedUniversities);
  
    const selectedCount = updatedUniversities.filter((university) => university.isSelected).length;
    setSelectedCount(selectedCount);

    const savedCountry = localStorage.getItem('country');
    const savedSelectedIndices = JSON.parse(localStorage.getItem(`selectedIndices${savedCountry}`) || '[]');

    if (updatedUniversities[index].isSelected) {
      if (!savedSelectedIndices.includes(index)) {
        savedSelectedIndices.push(index);
      }
    } else {
      const indexToRemove = savedSelectedIndices.indexOf(index);
      if (indexToRemove !== -1) {
        savedSelectedIndices.splice(indexToRemove, 1);
      }
    }

    localStorage.setItem(`selectedIndices${savedCountry}`, JSON.stringify(savedSelectedIndices));
  };

  return (
    isLoading ? (
      <div className="loader">
        <MagnifyingGlass
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#eee"
          color="#333"
        />
      </div>
    ) : (
      <div className="content-wrapper">
        <div className="search-block">
          <input
            type="text"
            className="input"
            placeholder="Enter country"
            value={country}
            onChange={handleInputChange}
          />
          <button className="button" onClick={handleSearchFromField}>Send</button>
          <button className="button" onClick={handleReset}>Reset</button>
        </div>
        <p className="error">{error}</p>
        {universities.length > 0 && (
          <>
            <p>Cheacboxes counter: {selectedCount}</p>
            <div className="scrolling-container" style={{ overflowX: 'auto', maxWidth: '100%' }}>
              <table className="table">
                <thead className="thead">
                  <tr>
                    <th className="th">#</th>
                    <th className="th">Universities</th>
                    <th className="th">Country</th>
                    <th className="th">Site</th>
                    <th className="th">Add to my list</th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  {universities.map((university, index) => (
                    <tr key={index + 1} className="tr">
                      <td className="td">{index + 1}</td>
                      <td className="td">{university.name}</td>
                      <td className="td">{university.country}</td>
                      <td className="td">
                        {university.web_pages.map((webPage) => (
                          <a key={webPage} href={webPage} target="_blank" rel="noopener noreferrer">
                            {webPage}
                          </a>
                        ))}
                      </td>
                      <td className="td">
                        <input
                          type="checkbox"
                          checked={university.isSelected}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    )
  );
};
