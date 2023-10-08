import { useState } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import './Task3.css';

export const Task3 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState('');
  const [universities, setUniversities] = useState();
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setCountry(e.target.value);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    handleReset();


    try {
      setError('');
      const response = await fetch(`http://universities.hipolabs.com/search?country=${country}`);
      
      if (!response.ok) {
        throw new Error('Request error.');
      }

      const data = await response.json();

      if (data.length === 0) {
        throw new Error('Country`s name is not correct');
      }

      setUniversities(data);
      setIsLoading(false);

    } catch (error) {
      setError(error.message);
      setUniversities();
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCountry('');
    setUniversities();
    localStorage.removeItem('country');
    setError('');
  };
  

  return (
    isLoading ? (
      <div className="loader">
        <MagnifyingGlass
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor = '#eee'
          color = '#333'
        />
      </div>
    ) : (
      <div className='content-wrapper'>
        <div className='search-block'>
          <input
            type="text"
            className="input"
            placeholder="Enter country"
            value={country}
            onChange={handleInputChange}
          />
          <button className="button" onClick={handleSearch}>Send</button>
          <button className='button' onClick={handleReset}>Reset</button>
        </div>
        <p className="error">{error}</p>
        { universities && (
          <div className="scrolling-container" style={{ overflowX: 'auto', maxWidth: '100%' }}>
          <table className="table">
            <thead className="thead">
              <tr>
                <th className="th">#</th>
                <th className="th">Назва університету</th>
                <th className="th">Країна</th>
                <th className="th">Сайт</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {universities.map((university, index) => (
                <tr key={index + 1} className='tr'>
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
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    )
  );
};