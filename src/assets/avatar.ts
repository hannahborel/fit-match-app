export const avatars = [
  require('@/assets/avatars/alien.png'),
  require('@/assets/avatars/bear.png'),
  require('@/assets/avatars/cat.png'),
  require('@/assets/avatars/chicken.png'),
  require('@/assets/avatars/panda.png'),
  require('@/assets/avatars/rabbit.png'),
  require('@/assets/avatars/sloth.png'),
  require('@/assets/avatars/woman.png'),
];
export function getAvatarByIndex(index: number) {
  return avatars[index % avatars.length]; // Loops through if index exceeds length
}
