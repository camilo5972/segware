import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
jest.mock('react-native-localize', () => ({
    getLocales: () => [
      { countryCode: "GB", languageTag: "en-GB", languageCode: "en", isRTL: false },
      { countryCode: "US", languageTag: "en-US", languageCode: "en", isRTL: false },
      { countryCode: "FR", languageTag: "fr-FR", languageCode: "fr", isRTL: false },
    ],
    getNumberFormatSettings: () => ({
      decimalSeparator: ".",
      groupingSeparator: ",",
    }),
    getCalendar: () => "gregorian", // or "japanese", "buddhist"
    getCountry: () => "US", // the country code you want
    getCurrencies: () => ["USD", "EUR"], // can be empty array
    getTemperatureUnit: () => "celsius", // or "fahrenheit"
    getTimeZone: () => "America/Lima", // the timezone you want
    uses24HourClock: () => true,
    usesMetricSystem: () => true,
  
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
}));
jest.useFakeTimers();