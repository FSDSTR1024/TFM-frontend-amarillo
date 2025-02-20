

const ProfileMenu = () => {
  return (
    <div className="profile-menu">
      <div className="profile-menu-banner">
        <label className='image-button' htmlFor='image-input'>
          <img src={image} onClick={()=> handleImgClick('image-input')} />
          <input className="image-input" type="file" accept="image/*" onChange={(e) => handleFileUpload(e.target.files[0])} />
        </label>
      </div>

    </div>
  );
}

export default ProfileMenu