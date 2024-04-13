const { getDocs, addDoc, collection, query } = require('firebase/firestore');
const { db } = require('../scripts/firebase');

const dbInstance = collection(db, 'schedules');

const addScheduleData = async (payload) => {
  await addDoc(dbInstance, {
    name: payload.name,
    days: payload.days,
    times: payload.times
  });
};

const fetchSchedulesData = async () => {
  const q = query(
    collection(db, 'schedules')
  );
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

const editScheduleData = (id, payload) => {
  const collectionById = doc(db, 'schedules', id);
  updateDoc(collectionById, {
    name: payload.name,
    days: payload.days,
    times: payload.times
  });
};

module.exports = {
  addScheduleData,
  fetchSchedulesData,
  editScheduleData
};
