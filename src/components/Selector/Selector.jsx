import styles from "./Selector.module.scss";
import Select, { components } from 'react-select';


const DropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10L12 15L17 10" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </components.DropdownIndicator>
    );
};

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: 'white',
        border: '1.5px solid black',
        borderRadius: '50px',
        padding: '4px 10px',
        boxShadow: 'none',
        cursor: 'pointer',
        '&:hover': {
            borderColor: 'black'
        }
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: '0',
        justifyContent: 'center',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'black',
        textTransform: 'uppercase',
        textAlign: 'center',
        margin: '0 0 0 10px',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'black',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        textAlign: 'center',
        margin: '0 0 0 10px',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        padding: 0,
        color: 'black',
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: '10px',
        marginTop: '8px',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#333' : state.isFocused ? '#f0f0f0' : 'white',
        color: state.isSelected ? 'white' : 'black',
        cursor: 'pointer',
        padding: '12px 15px',
    }),
};

export const SortSelect = ({ lang, sortOption, handleSortChange }) => {
    const options = [
        { value: 'default', label: lang === 'ru' ? 'По умолчанию' : 'Default' },
        { value: 'price_asc', label: lang === 'ru' ? ' Дешевле' : 'Lower price' },
        { value: 'price_desc', label: lang === 'ru' ? 'Дороже' : 'Higher price' },
    ];

    const getPlaceholder = () => {
        switch(sortOption) {
            case 'price_asc':
                return lang === 'ru' ? 'ДЕШЕВЛЕ' : 'LOWER PRICE';
            case 'price_desc':
                return lang === 'ru' ? 'ДОРОЖЕ' : 'HIGHER PRICE';
            default:
                return lang === 'ru' ? 'СОРТИРОВКА' : 'SORT BY';
        }
    };

    const selectedValue = options.find(option => option.value === sortOption);
    return (
        <div className={styles.root} style={{ width: '220px' }}>
            <Select
                value={selectedValue}
                onChange={(selected) => handleSortChange(selected.value)}
                options={options}
                styles={customStyles}
                components={{ DropdownIndicator }}
                isSearchable={false}
                placeholder={getPlaceholder()}
            />
        </div>
    );
};