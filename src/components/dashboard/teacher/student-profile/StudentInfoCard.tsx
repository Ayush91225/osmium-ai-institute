'use client';

export default function StudentInfoCard() {
  return (
    <div className="bg-white rounded-[20px] border border-[#e7e7e7] overflow-hidden mb-6">
      <div className="bg-[#f3f3f3] px-7 py-4 grid grid-cols-1 md:grid-cols-6 gap-3 text-[13px] text-[#777] font-medium tracking-wide">
        <div>CONTACT</div>
        <div>DOB</div>
        <div>Class</div>
        <div>FATHER</div>
        <div>MOTHER</div>
        <div>UID</div>
      </div>

      <div className="px-7 py-5 grid grid-cols-1 md:grid-cols-6 gap-4 text-[15px] text-[#222]">
        <div className="leading-relaxed">
          Divyaxyz@gmail.com<br />
          <span className="text-[13px] text-[#999]">+91 9876543210</span>
        </div>
        <div>08-05-2006</div>
        <div>
          12th Section B<br />
          <span className="inline-block px-3 py-1 text-xs bg-[#e4f3e4] text-[#3a8d3a] rounded-[10px] mt-1.5 font-medium">Active</span>
        </div>
        <div>
          K.C Gupta<br />
          <span className="text-[13px] text-[#999]">9876543210</span>
        </div>
        <div>
          Manorama Gupta<br />
          <span className="text-[13px] text-[#999]">9876543210</span>
        </div>
        <div>24BTCSE045</div>
      </div>
    </div>
  );
}
