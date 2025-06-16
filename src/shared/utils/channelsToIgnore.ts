const channelsToIgnore = (current: string, channels: string[]): boolean => {
  if (!channels.includes(current)) {
    return false;
  }

  return true;
};
export default channelsToIgnore;
