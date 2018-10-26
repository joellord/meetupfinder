import store from "./Store";

const BASE_URL = "https://wt-13aebf4eeaa9913542725d4a90e4d49e-0.run.webtask.io/meetupfinder/meetups";

function processData(data) {
  store.updateGlobalState({isLoading: false});

  //Process Meetup data
  let maxMembers = 0;
  let meetups = data.map(i => {
    if (i.members > maxMembers) maxMembers = i.members;
    if (i.status !== 'active' && i.visibility !== 'public') {
      return undefined;
    } else {
      return {
        id: i.id,
        name: i.name,
        link: i.link,
        description: i.description,
        created: i.created,
        location: i.city + ', ' + i.state + ', ' + i.country,
        coords: { lat: i.lat, lon: i.lon },
        members: i.members,
        who: i.who,
        nextEvent: i.next_event ? i.next_event : { time: undefined, yes_rsvp_count: 0 },
        lastEvent: i.last_event ? i.last_event : { time: undefined, yes_rsvp_count: 0 },
        score: 0,
      };
    }
  });

  meetups = meetups
    .map(m => {
      let d = new Date().getTime();
      // 100 points for last meetup in the last 30 days
      // 75 points for last meetup in the last 60 days
      // 50 points for last meetup exists
      // 25 points for next meetup
      // 1-100 ratio to max members
      let ratio = m.members * 100 / maxMembers;
      m.score += m.lastEvent.time ? 50 : 0;
      let daysSinceLastEvent = Math.floor((d - m.lastEvent.time) / 1000 / 60 / 60 / 24);
      m.score += daysSinceLastEvent < 60 ? 25 : 0;
      m.score += daysSinceLastEvent < 30 ? 25 : 0;
      m.score += m.nextEvent.time ? 25 : 0;
      m.score += ratio;
      return m;
    })
    .sort((a, b) => {
      if (a.score < b.score) return 1;
      if (b.score < a.score) return -1;
      return 0;
    });

  store.updateGlobalState({meetups});

}

function fetchMeetups() {
  store.updateGlobalState({isLoading: true});

  let state = store.getGlobalState();
  let args;

  if (state.latlng.lat && state.latlng.lng) {
    args = `lat=${state.latlng.lat}&lon=${state.latlng.lng}`;
  } else {
    args = `location=${state.city}`;
  }

  args += `&radius=${state.radius}`;

  let url = `${BASE_URL}?${args}`;

  return fetch(url).then(res => res.json()).then(data => processData(data));
}

export {
  fetchMeetups
}