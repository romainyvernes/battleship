const Ship = (length) => {
  const parts = new Array(length).fill(0);

  const hit = (index) => {
    if (parts[index] !== 1) {
      parts[index] = 1;
    } else {
      throw new Error('Position already hit');
    }
  };

  const isSunk = () => {
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === 0) return false;
    }
    return true;
  };

  return {
    parts,
    hit,
    isSunk,
  };
};

export default Ship;