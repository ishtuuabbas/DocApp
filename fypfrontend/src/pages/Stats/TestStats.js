// Importing icons individually
import AlarmIcon from "@mui/icons-material/Alarm";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PersonIcon from "@mui/icons-material/Person";

const TestStats = () => {
  return (
    <div className="flex flex-wrap">
      <div className="w-1/4 p-2">
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4 rounded-lg shadow-lg text-white">
          <AlarmIcon fontSize="large" />

          <p className="text-lg py-1">Appointment</p>
          <h2 className="text-lg">96</h2>
        </div>
      </div>

      <div className="w-1/4 p-2">
        <div className="bg-gradient-to-r from-fuchsia-600 to-purple-600 p-4 rounded-lg shadow-lg text-white">
          <LocalHospitalIcon fontSize="large" />
          <p className="text-lg py-1">Hospital Earning</p>
          <h2 className="text-lg">$78K</h2>
        </div>
      </div>

      <div className="w-1/4 p-2">
        <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 p-4 rounded-lg shadow-lg text-white">
          <FavoriteIcon fontSize="large" />
          <p className="text-lg py-1">Total Patient</p>
          <h2 className="text-lg">553K</h2>
        </div>
      </div>

      <div className="w-1/4 p-2">
        <div className="bg-gradient-to-r from-blue-800 to-indigo-900 p-4 rounded-lg shadow-lg text-white">
          <PersonIcon fontSize="large" />
          <p className="text-lg py-1">Total Doctor</p>
          <h2 className="text-lg">86</h2>
        </div>
      </div>
    </div>
  );
};

export default TestStats;
