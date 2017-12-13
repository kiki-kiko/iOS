# Redirect all messages using the facility "com.apple.family.log.file" to our log file.
# Messages intended for syslog use a different facility, "com.apple.family.log.syslog".
? [= Facility com.apple.family.log.file] claim only
* file /var/mobile/Library/Logs/CrashReporter/DiagnosticLogs/Family/family.log rotate=seq compress uid=501 gid=501 file_max=10M all_max=100M ttl=3

# Specify creation rules for our log directory.
> /var/mobile/Library/Logs/CrashReporter/DiagnosticLogs/Family uid=501 gid=501 mode=0755
