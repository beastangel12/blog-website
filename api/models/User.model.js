import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profielPicture: {
      type: String,
      default:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACUCAMAAABGFyDbAAAAMFBMVEXk5ueutLepsLPV2drn6erq7O2xt7rd4OHh4+SmrbG+w8XP0tS3vL/IzM7Cx8nLz9GKL+zPAAADh0lEQVR4nO2b627rIAyAuRgIl9D3f9uRtD1Ld5oGnNhsEp+0aT8/GccY8IQYDAaDwWAwGAwGg8FgMPhbQG+Bn4Axzmmt3WTML5ED4WKQ3nulVPmdsnbQXQ0gJqvkFmVD7BszcLN/dXqYydvUTwxm+U5qFUvRdJLSu1J3MdcjYGb+4HRH83tN4VOoHgGbua0gHUqtXrzxmmyNVfEKnF6mKlbs8aq2Kl43Li+Ix9m+8eKqE843WElpJx6thiVcw5U56j3cWpZwwTsOrVYrKQODVW62KrsQuVZtIX0hUWdXW3F4Qp5dBhMsKTNx7ZraataTRFu7YMasoSRP+sZS+oR4x3a41KL+FjVyDaUnjRaqPKxalCUCMlZLUR436rvS/6DsBpHFdIGyoBq0laQ8axhsag2tX6SFT3lSLXyBIP0SA1orEmqh+xraKn9iTyTtAzXSSirSxmbC5jxtvwXInFeR0gp5HisQn8gAefKhtUIWVPo7QdS3qOhv3hDhUtSH6uXtApH0DBdciC6CPlgCkV0MmSXaS6qibB62Xm1WDFeUd622ZWSyatyCOK6Zn17Vh37P+qZYezlP25S+8aqKF2+sVq/j/FK2w6vw4feoiO9x97zMpwcNJXtNHAhwdq8r9LnLuMED49KbYQhls+sVqjsg3GxfBlqUT7FnpP6ZGaHnkFKy5SfMGvoGagMAiGlh/esXcBdy61DZMlfm3OQm6CkHpqxezGX5rJX3xC+/bFnKkG9adJh7K8FwJZ+UVzulfhl8Szk6wRg2AJ2T3TN6KakplLAxmAFMOviGo3WpFzdHPGQJxgXbfCBTNkXCxQR3k7griBKzTNSlwpTbA7URk0FfX2fBZWSgvvHp4qdhEPszk02EC3dLEPHtdCmG6xoeEOkqKbl20pekGP4ufk8sXTHBWzHI2ep1OmDQONlWiT83kGoihZRcFvJMvGaSWK3gE8xcn1YbLHabJLUqXqgKduLtsNYLES/8gEiDV/NtAPpxp4nW75GoXv2k9dEFNS+JoanVMVduzh/xLUuInh5rp+GFg20JF6qX8fJW5iO2+mtk+Qqf1L69wPE/8FxK5YMxeogTSeWrP0t931JV608MQyGpGnRBDlOfoGYL4k74hYqkx46rnMEeX5uwVvgH6rjSo0ehzmgdJxfjLv1NOCoRvPvhk8PKBWH5/2hu/KGW7gHt0NlgMBgMBn+YL2oJKuFEOZ7eAAAAAElFTkSuQmCC",
    },
  },
  //   timestamps will help to saved the two thing while adding the new user the time of creation and time of update
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
