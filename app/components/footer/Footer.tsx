
export default function Footer() {
  return (
    <>
      <div className="bg-gray-800 w-auto h-auto items-center text-white text-center p-4">
        <div className="flex flex-col md:flex-row justify-around">
          {/* about us section  */}
          <div>
            <span className="font-semibold text-2xl">About Us</span>
            <div className=" flex flex-col  text-gray-300 p-4 pt-1">
              <div>Kalaam: The Poetry Club</div>
              <div>NIT Rourkela</div>
              <div>India</div>
            </div>
          </div>

          {/* our pioneer section */}
          <div className="flex flex-col gap-4 justify-center">
            <span className="text-bold font-semibold  text-2xl">
              Our Pioneer
            </span>
            <div className="flex flex-col  md:flex-row ">
              <div className="w-auto">
                <span className="text-xl ">Faculty Advisor</span>
                <div className="text-gray-300 p-4 pt-1">
                  <div>Dr. Sushanta Kumar Panigrahi</div>
                  <div>Assistant Professor</div>
                  <div>Humanities and Social Sciences</div>
                  <div>pkumar@nitrkl.ac.in</div>
                  <div>NIT Rourkela</div>
                </div>
              </div>
              <div className="w-auto">
                <span className="text-xl">President</span>
                <div className="text-gray-300 p-4 pt-1 ">
                  <div>Ashish Singh</div>
                  <div>Electrical Engineering</div>
                  <div>121ee0368@nitrkl.ac.in</div>
                  <div>NIT Rourkela</div>
                </div>
              </div>
            </div>
          </div>

          {/* connect with us */}
          <div>
            <span className="font-semibold text-2xl">Connect Us</span>
            <div className="text-gray-300 p-4 pt-1">
              <div>
                <div>Instagram</div>
                <div>Facebook</div>
                <div>Twitter</div>
                <div>LinkedIn</div>
              </div>
            </div>
          </div>
        </div>

        <hr className="text-white" />
        <div className="p-4">
          <p className="text-sm">
            <h1 className="text-2xl">Kalaam: The Poetry Club</h1>
            This website is made for the Kalaam club of NIT Rourkela by Ashish
            Singh.
            <p className="text-sm">© 2024 Kalaam: The Poetry Club</p>
          </p>
        </div>
      </div>
    </>
  );
}
