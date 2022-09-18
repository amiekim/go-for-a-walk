import { getDatabase, ref, set, onValue } from "firebase/database";

class DiaryRepository {
    constructor () {
        this.firebaseDatabase = getDatabase();
    }
    newDiary(diaryData) {
        const {userId, title, memo} = diaryData
        set(ref(this.firebaseDatabase, 'users/' + userId), {
            title,
            memo,
          });
    }
    openDiary(diaryData) {
        const {userId} = diaryData
        const starCountRef = ref(this.firebaseDatabase, 'users/' + userId);
        onValue(starCountRef, (snapshot) => {
        console.log(snapshot.val());
        });
    }
}

export default DiaryRepository;
