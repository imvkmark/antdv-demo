import { ElMessage } from 'element-plus';


export const pcToast = (message: string, success: boolean, warning?: boolean) => {
    if (success) {
        ElMessage.success(message)
    } else {
        if (warning) {
            ElMessage.warning(message);
        } else {
            ElMessage.error(message);
        }
    }
}