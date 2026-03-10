'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useNetworkStatus } from '@/hooks/use-network-status';
import React from 'react';

const Picture = () => {
  const [image, setImage] = React.useState<string>(
    'https://github.com/shadcn.png',
  );
  const isOnline = useNetworkStatus();

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handlePickImage = () => {
    if (isOnline) {
      fileInputRef.current?.click();
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImage(url);
  };

  return (
    <div
      className={`flex flex-col gap-3 items-center justify-center w-fit mx-auto ${isOnline ? 'cursor-pointer' : ''}`}
      onClick={handlePickImage}>
      <Avatar className='size-[120px]'>
        <AvatarImage src={image} alt='profile' />
      </Avatar>
      {isOnline && <p className='text-body text-xs'>Tap to change your logo</p>}
      <input
        type='file'
        ref={fileInputRef}
        accept='image/*'
        className='hidden'
        onChange={handleChangeImage}
      />
    </div>
  );
};

export default Picture;
