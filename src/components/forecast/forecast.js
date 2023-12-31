import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "../forecast/forecast.css";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {
  const dayInaWeek = new Date().getDate(); // get the forecast for the days ahead , if you check fri weather on friday , you will get a forecast from sat,sunday,mon,tues
  const forsecastDays = WEEK_DAYS.slice(dayInaWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInaWeek)
  );
  // console.log(forsecastDays);
  return (
    <>
      <label className="title">Daily </label>
      <Accordion allowZeroExpanded>
        {" "}
        {/*allow the modal/accordion to be closed  */}
        {data.list.splice(0, 7).map((item, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    alt="wather"
                    className="icon-small"
                    src={`icons/${item.weather[0].icon}.png `}
                  />
                  <label className="day">{forsecastDays[index]}</label>
                  <label className="description ">
                    {item.weather[0].description}
                  </label>
                  <label className="max-min">
                    {Math.round(item.main.temp_min)}°C /{" "}
                    {Math.round(item.main.temp_max)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Pressure</label>
                  <label>{item.main.pressure} hPa</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Humidity :</label>
                  <label>{item.main.humidity}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Clouds :</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Wind Speed :</label>
                  <label>{item.wind.speed}m/s</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Sea Level :</label>
                  <label>{item.main.sea_level}m</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Feels like :</label>
                  <label>{Math.round(item.main.feels_like)}°C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
