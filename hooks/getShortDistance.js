export default distance => {
  distance = Math.round(distance);
  if (distance > 999) {
    return [Math.round(distance / 100) / 10, 'Mi'];
  }
  return [distance, 'M'];
};
