const getRandomAvatar = () => {
    return `https://api.dicebear.com/8.x/lorelei/svg?seed=${Math.random()}&format=png`;
};
  
export default getRandomAvatar;