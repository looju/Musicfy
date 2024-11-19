export const uris = [
  {
    "url": "https://audio.jukehost.co.uk/vTRYaTEbpaYRCxiWGgL2S91mnOuMKfLw",
  },
  {
    "url": "https://audio.jukehost.co.uk/priWy2vYsWODmQiM6KevNYVLpPJGPZGd",
  },
  {
    "url": "https://audio.jukehost.co.uk/rSmGXxf0OJLipPwFRyvoFKodDOj5VuWf",
  },
  {
    "url": "https://audio.jukehost.co.uk/ZLdoXNocDAcsgeq6QKtPRHyvlqslNbke",
  },
  {
    "url": "https://audio.jukehost.co.uk/rZ9sshicVlki8Dnm95ps1eWhK95dYgKF",
  },
  {
    "url": "https://audio.jukehost.co.uk/ZufGK11EtwQWXge8xYo5EQ02RuJqtr4s",
  },
  {
    "url": "https://audio.jukehost.co.uk/Tn0JjUOFnQXt94p3CQCA4AkB3weF51Yf",
  },
  {
    "url": "https://audio.jukehost.co.uk/yA5v0HqEX7pRLKDkjp3XeFDcksZVv7lr",
  },
  {
    "url": "https://audio.jukehost.co.uk/BTIDaoKPirPWaPpHl8SOsIU8Ge9Zx9Mb",
  },
  {
    "url": "https://audio.jukehost.co.uk/nXa6f08Ojlz1V2SYJ3axYmSa7ot0hblZ",
  },
  {
    "url": "https://audio.jukehost.co.uk/cbMVQp4JGHhSNEeCqRjvieiigYpUaE0s",
  },
  {
    "url": "https://audio.jukehost.co.uk/Ge9fdTsk6Y9SWoOnC7QJH0n8pprU7rev",
  },
  {
    "url": "https://audio.jukehost.co.uk/KDOr4agGwHHvikLtk9zukiiDpYNzIp8w",
  },
  {
    "url": "https://audio.jukehost.co.uk/K4PdyskIIfRrRotZtwF0EfHkJGjTs9Dy",
  },
  {
    "url": "https://audio.jukehost.co.uk/5MLu9yZCOGOCpf9yhdK4uitEv2CZ9fwx",
  },
  {
    "url": "https://audio.jukehost.co.uk/bnvYr6BoqfoZjrx72rvq3hGXyE6b7Qyz",
  },
];

export function getRandomUri(arr: Array<any>) {
  // get random index value
  const randomIndex = Math.floor(Math.random() * arr.length);

  // get random item
  const item = arr[randomIndex];

  return item;
}

export const randomUri = getRandomUri(uris);

//to complement for the lack of mp3 files being returuned from discogs api
