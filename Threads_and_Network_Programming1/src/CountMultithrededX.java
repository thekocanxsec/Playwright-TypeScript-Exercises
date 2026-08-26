public class CountMultithrededX extends Thread{
    private int threadNumber;

    public CountMultithrededX(int threadNumber){
        this.threadNumber = threadNumber;
    }

    @Override
    public void run(){
       for(int i = 0; i <= 5; i++){
           try{
               System.out.println(i + " from the thread: " + this.threadNumber);
               Thread.sleep(100);
           }catch(InterruptedException e){
               throw new RuntimeException(e);
           }
       }
    }
}

class MainRun2{
    static void main(String[] args) {
        CountMultithrededX mc1 = new CountMultithrededX(1);
        CountMultithrededX mc2 = new CountMultithrededX(2);

        mc1.start();
        mc2.start();
    }
}