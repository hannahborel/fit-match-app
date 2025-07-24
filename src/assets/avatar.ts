export const avatars = [
  require('@/assets/avatars/alien.png'),
  require('@/assets/avatars/bear.png'),
  require('@/assets/avatars/cat.png'),
  require('@/assets/avatars/chicken.png'),
  require('@/assets/avatars/panda.png'),
  require('@/assets/avatars/rabbit.png'),
  require('@/assets/avatars/sloth.png'),
  require('@/assets/avatars/woman.png'),
  require('@/assets/avatars/meerkat.png'),
  require('@/assets/avatars/giraffe.png'),
  require('@/assets/avatars/koala.png'),
];
export function getAvatarByIndex(index: number) {
  return avatars[index % avatars.length]; // Loops through if index exceeds length
}

// function getAvatarForUserId(userId: string) {
//   let hash = 0;
//   for (let i = 0; i < userId.length; i++) {
//     hash += userId.charCodeAt(i);
//   }
//   return avatars[hash % avatars.length];
// }
