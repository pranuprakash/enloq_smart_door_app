import { create } from 'zustand'

const useStore = create((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
  userID : '',
  setUserID :(id) => set(() => ({ userID: id  })),
  userData : null,
  setUserData :(data) => set(() => ({ userData: data  })),
  premisesData : null,
  setPremisesData :(data) => set(() => ({ premisesData: data  })),
  doorData:null,
  setDoorData :(data) => set(() => ({ doorData: data  })),
  passData:null,
  setPassData :(data) => set(() => ({ passData: data  })),
}))

export default useStore;