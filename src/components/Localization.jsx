import { useState, useEffect } from "react";

export default function Localization(props){

    const { setLoading, setLocalization,
            locale, setLocale, 
            setLocaleData, setLocaleOptions } = props;

    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/locales/localization.json')
        .then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch localization data');
            }
            return response.json();
        })
        .then(data => {
            setLocalization(data);
            setLoading(false);
            if(locale === null){
                const KEYS = Object.keys(data);
                setLocaleOptions(KEYS);
                setLocale(KEYS[0]);
                setLocaleData(data[KEYS[0]]);
            }else{
                console.log(locale, data[locale]);
                setLocaleData(data[locale]);
            }            
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return(<></>);

}
