import { getDatabase, ref, set, onValue } from "firebase/database";

class DiaryRepository {
    constructor () {
        this.firebaseDatabase = getDatabase();
    }
    newDiary(diaryData) {
        const {divTime, regTime, userEmail, title, memo, imgName, imgUrl} = diaryData
        const userId = userEmail.split("@");
        const emailAddr = userId[1].split(".")[0];
        const repoName = userId[0] + '_a_' + emailAddr

        set(ref(this.firebaseDatabase, 'user/' + repoName + `/${divTime}`), {
            regTime,
            title,
            memo,
            imgName,
            imgUrl
          });
    }
    openDiary(diaryData) {
        const {userEmail, getData} = diaryData;
        const userId = userEmail.split("@");
        const emailAddr = userId[1].split(".")[0];
        const repoName = userId[0] + '_a_' + emailAddr
        let result = false;
        const starCountRef = ref(this.firebaseDatabase, 'user/' + repoName);
        onValue(starCountRef, (snapshot) => {
            result = snapshot.val();
            getData(result);
        });
    }
}

export default DiaryRepository;
