-- House personality copy
insert into house_copy (copy_key, house_state, mode, trigger, text) values
('strict_intro', 'strict', 'individual', 'session_start', 'Hôm nay tao mệt. Có 3 gợi ý thôi.'),
('strict_reject_1', 'strict', 'individual', 'candidate_rejected', 'Còn 2 lần.'),
('strict_reject_2', 'strict', 'individual', 'candidate_rejected', 'Còn 1 lần cuối.'),
('strict_final', 'strict', 'individual', 'house_takeover', 'Hết. Tao chốt cái này.'),
('chill_intro', 'chill', 'individual', 'session_start', 'Hôm nay tao dễ tính. Đổi bao nhiêu cũng được.'),
('chill_suspicious', 'suspicious', 'individual', 'candidate_rejected', 'Khó chiều thế.'),
('chill_annoyed', 'annoyed', 'individual', 'candidate_rejected', 'Mày định ăn không vậy???'),
('chill_takeover', 'override', 'individual', 'house_takeover', 'Thôi. Tao chọn. Xong.');
