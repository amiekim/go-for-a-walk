import { getDatabase, ref, set, onValue, remove } from "firebase/database";

class DiaryRepository {
    constructor () {
        this.firebaseDatabase = getDatabase();
    }
    newDiary(diaryData) {
        const {uid, divTime, regTime, userEmail, title, memo, imgName, imgUrl} = diaryData
        const userId = userEmail.split("@");
        const emailAddr = userId[1].split(".")[0];
        const repoName = userId[0] + '_a_' + emailAddr;

        return set(ref(this.firebaseDatabase, 'user/' + uid + `/${divTime}`), {
            memoIndex: divTime,
            regTime,
            title,
            memo,
            imgName,
            imgUrl,
            updateTime: "",
          });
    }
    updateDiary(diaryData) {
        const {uid, divTime, userEmail, title, memo, imgName, imgUrl, updateTime} = diaryData
        const userId = userEmail.split("@");
        const emailAddr = userId[1].split(".")[0];
        const repoName = userId[0] + '_a_' + emailAddr;

        return set(ref(this.firebaseDatabase, 'user/' + uid + `/${divTime}`), {
            memoIndex: divTime,
            title,
            memo,
            imgName,
            imgUrl,
            updateTime
          });
    }
    delDiary(diaryData) {
        const {uid, divTime, userEmail} = diaryData
        const userId = userEmail.split("@");
        const emailAddr = userId[1].split(".")[0];
        const repoName = userId[0] + '_a_' + emailAddr;

        return remove(ref(this.firebaseDatabase, 'user/' + uid + `/${divTime}`), {});
    }

    openDiary(diaryData) {
        const {uid, userEmail, getData} = diaryData;
        const userId = userEmail.split("@");
        const emailAddr = userId[1].split(".")[0];
        const repoName = userId[0] + '_a_' + emailAddr
        let result = false;
        const getDiary = ref(this.firebaseDatabase, 'user/' + uid);
        return onValue(getDiary, (snapshot) => {
            result = snapshot.val();
            getData(result);
        });
    }
}

export default DiaryRepository;
