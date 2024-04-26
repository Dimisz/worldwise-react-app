import styles from './CountryList.module.css';
import Spinner from './Spinner';
import CountryItem from './CountryItem';
import Message from './Message';

export default function CountryList({cities, isLoading}){
  if(isLoading){
    return <Spinner/>;
  }
  if(cities.length <= 0 || !cities){
    return <Message message="Add your first country by clicking on a city on the map" />
  }

  const countries = cities.reduce((arr, city) => {
    if(!arr.map(el => el.country).includes(city.country))
    return [...arr, {country: city.country, emoji: city.emoji}];
    else return arr;
  }, []);

  return(
    <ul className={styles.countryList}>
      {countries.map((country) => <CountryItem country={country} />)}
    </ul>
  );
}