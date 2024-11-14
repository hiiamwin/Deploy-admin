export async function getLocations(query: string) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query
    )}&format=json&addressdetails=1&countrycodes=VN`
  );
  const data = await response.json();
  return data;
}
