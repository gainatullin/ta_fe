import { getRandomInt } from 'core/helpers';

export const getAvatarSrc = (type: 'users' | 'projects', id: number, withRandom: boolean = false) =>
  `${process.env.NEXT_PUBLIC_API_BASE_URL || '/api'}/${type}/download?id=${id}${
    withRandom ? `&r=${getRandomInt()}` : ''
  }`;
