import { getDatabase, ref, set, onValue } from "firebase/database";

class DiaryRepository {
    constructor () {
        this.firebaseDatabase = getDatabase();
    }
    newDiary(diaryData) {
        const {regTime, userEmail, title, memo, fileName, fileUrl} = diaryData
        const userId = userEmail.split("@");
        const emailAddr = userId[1].split(".")[0];
        const repoName = userId[0] + '_a_' + emailAddr

        set(ref(this.firebaseDatabase, 'user/' + repoName), {
            regTime,
            title,
            memo,
            fileName,
            fileUrl
          });
    }
    openDiary(diaryData) {
        const {userEmail} = diaryData;
        const userId = userEmail.split("@");
        const emailAddr = userId[1].split(".")[0];
        const repoName = userId[0] + '_a_' + emailAddr
        const starCountRef = ref(this.firebaseDatabase, 'user/' + repoName);
        onValue(starCountRef, (snapshot) => {
            // console.log(snapshot.val());
        });
    }
}

export default DiaryRepository;
