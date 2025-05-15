export default function EventList({ events }) {
  return (
    <div className="event-list">
      {" "}
      {events.map((event, i) => (
        <div key={i} className="event-card">
          {" "}
          <h3>{event.name?.text || event.name}</h3>{" "}
          <p>{event.start?.local || event.dates?.start.localDate}</p>{" "}
          <p>
            {event.venue?.address?.localized_address_display ||
              event._embedded?.venues?.[0]?.name}
          </p>{" "}
          {event.logo && <img src={event.logo.url} alt={event.name?.text} />}{" "}
          <a href={event.url || event._embedded?.url} target="_blank">
            More Info
          </a>{" "}
        </div>
      ))}{" "}
    </div>
  );
}
