import { useEffect, useState } from "react";
import { AvatarIdent } from "@pkmn/protocol";
import { Sprites } from "@pkmn/img";
import styles from "./Avatar.module.css";

function Avatar({ avatar, size, onValidity }: { avatar: AvatarIdent, size?: number, onValidity?: (valid: boolean) => void }) {
  const [valid, setValid] = useState(true);

  useEffect(() => { if (onValidity) onValidity(valid) }, [valid, onValidity]);

  const sanitizedAvatar = avatar.toLowerCase();
  const avatarURL = Sprites.getAvatar(sanitizedAvatar);

  return (
    <div className={styles.Avatar}>
      <img src={avatarURL} className={styles.image} width={size} height={size} alt={valid ? `Avatar ${avatar}` : `"${avatar}" is not a valid avatar.`} onLoad={() => setValid(true)} onError={() => setValid(false)} />
    </div>
  );
}

export default Avatar;
